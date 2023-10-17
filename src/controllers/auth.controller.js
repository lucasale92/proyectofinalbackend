import { RecoverCodesModel } from '../DAO/models/recoverCodes.js';
import { UserModel } from '../DAO/models/users.model.js';
import { createHash, generateRandomCode, transport } from '../utils.js';

class AuthController {
  async renderLogin(req, res) {
    return res.render('login', {});
  }

  async login(req, res) {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    req.session.email = req.user.email;
    req.session.isAdmin = req.user.isAdmin;
    req.session.cart = req.user.cart;

    return res.redirect('/products');
  }

  async perfil(req, res) {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin, cart: req.session.cart };
    return res.render('perfil', { user: user });
  }

  async admin(req, res) {
    return res.send('datos clasificados');
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'No se pudo cerrar su sesión :(' });
      } else {
        return res.redirect('/auth/login');
      }
    });
  }

  async register(req, res) {
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }

    req.session.email = req.user.email;
    req.session.isAdmin = req.user.isAdmin;
    req.session.cart = req.user.cart;

    return res.redirect('/auth/perfil');
  }

  async failRegister(req, res) {
    return res.json({ error: 'fail to register' });
  }

  async failLogin(req, res) {
    return res.status(401).render('error', { error: 'Usuario o contraseña incorrectos' });
  }

  async renderRegister(req, res) {
    return res.render('register', {});
  }

  async renderRecoverEmail(req, res) {
    return res.render('recoverEmail', {});
  }

  async recoverEmail(req, res) {
    const { email } = req.body;
    let code = generateRandomCode();

    /* TODO Poner en un archivo aparte y exportarlo */
    const codeCreated = await RecoverCodesModel.create({ email, code, expires: Date.now() + 3600000 });

    const result = transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
            <div>
              <a href='${process.env.API_URL}auth/recover-pass?code=${code}&email=${email}'>Recuperar contraseña</a>
            </div>
            `,
    });

    console.log('Email', email);
    console.log('Codigo', codeCreated);
    console.log('Resultado', result);

    res.render('check-email', {});
  }

  async renderRecoverPass(req, res) {
    const { code, email } = req.query;
    const foundCode = await RecoverCodesModel.findOne({ code, email });

    if (foundCode && parseInt(Date.now()) < foundCode.expires) {
      res.render('recoverPass', { email, code });
    } else {
      res.render('error');
    }
  }

  async recoverPass(req, res) {
    const { code, email, pass } = req.body;
    const password = createHash(pass);

    const foundCode = await RecoverCodesModel.findOne({ code, email });

    if (foundCode && parseInt(Date.now()) < foundCode.expires) {
      await UserModel.updateOne({ email }, { password });
      res.render('recoverPassOk', { email });
    } else {
      res.render('error');
    }
  }

  async session(req, res) {
    return res.send(JSON.stringify(req.session));
  }
}

export const authController = new AuthController();