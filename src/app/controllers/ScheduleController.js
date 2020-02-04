import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.UserId, provider: true }
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    // const { date } = req.query;

    // const appointments = await Appointment.findAll();

    return res.json({ ok: true });
  }
}

export default new ScheduleController();
