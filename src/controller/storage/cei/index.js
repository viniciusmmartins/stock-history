import * as admin from 'firebase-admin'

export class CEIStorageController {
    constructor() {
        this.firestore = admin.firestore()
    }
    /**
     * 
     * @param {String} username 
     * @param {{field:String,direction: 'asc' | 'desc'}} sort 
     * @param {number} limit 
     */
    async getStocks(username, sort,limit = 10) {
        const userSnapshot = await this.firestore.collection('users').where('username', '==', username).get()
        if (userSnapshot.empty) throw new Error('User not found')
        else {
            const user = userSnapshot.docs[0]
            return await this.firestore.collection('stocks').where('user_id', '==', user.id).orderBy(sort.field, sort.direction).limit(limit).get()
        }
    }
    /**
     * 
     * @param {{username:String, password:String}} user 
     */
    async saveStocks(user, stocks) {
        let user_id;
        const userSnapshot = await this.firestore.collection('users').where('username', '==', user.username).get()
        if (userSnapshot.empty) {
            const newUser = await this.firestore.collection('users').add(user);
            user_id = newUser.id;
        } else {
            user_id = userSnapshot.docs[0].id
        }
        if (!user_id) throw new Error('User id not found')
        stocks = {
            ...stocks,
            user_id
        }
        return await this.firestore.collection('stocks').add(stocks)
    }
}