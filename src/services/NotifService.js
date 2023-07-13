import Notification from "../models/Notification.js"

class NotifService {
    async getNotifications(account_id) {
        return await Notification.findAll({
            where: {
                account_id: account_id
            },
            raw: true,
            nest: true
        })
    }

    async createNotification(payload) {
        return await Notification.create(payload)
    }

    async readNotification(id) {
        return await Notification.update({ is_read: true }, { where: { id: id } })
    }

    async readAllNotification(account_id) {
        return await Notification.update({ is_read: true }, { where: { account_id: account_id } })
    }

    async destroyNotification(id) {
        return await Notification.destroy({ where: { id: id } })
    }
}

export default NotifService