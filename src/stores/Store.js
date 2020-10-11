import { observable, action, computed } from 'mobx';
import inbox from '../components/Inbox.json'
import spam from '../components/Spam.json'

class Store {
    @observable allspammail = spam
    @observable allmail = inbox
    @observable deletedMail = []
    @observable selectedmail = inbox[0];

    //to count mail count and show in inbox folder
    @computed get loadUnreadMail () {
       return this.allmail.length;
    }

    //to update the all  mail array and push in delete array to show in trash
    @action updateCount(item,index) {
        this.allmail.splice(index, 1)
        this.deletedMail.push(item)
    }

    //to update the read and unread mails
    @action updateMailCount(data,index) {
        this.selectedmail= data
        this.allmail.map(function(item,index){
            if(item.mId === data.mId){
                item.unread = false
            }
        })
    }
    //to mark flag in mail
    @action updateFlagCount(data,index) {
        this.allmail.map(function(item,index){
            if(item.mId === data.mId){
                item.flag = true
            }
        })
    }
    
}

const storeInstance = new Store()

export default storeInstance;