import { Component, Input } from '@angular/core';

import { DataService } from '../../srv/data.service';
import { AuthService } from '../../srv/auth.service';
import { IMessage } from '../../models/IMessage';
import { TabsMessage } from '../../models/TabsMessage';

@Component({
    selector: 'msg-table',
    templateUrl: './msgtable.component.html'
})
export class MsgTableComponent {

    private currentTab: TabsMessage;
    private currentLst: Array<IMessage>;

    @Input()
    get CurrentTab() : TabsMessage {
        return this.currentTab;
    }

    set CurrentTab(val: TabsMessage) {
        this.currentTab = val;

        switch (this.currentTab) {
            case TabsMessage.Incoming:
                this.currentLst = this.auth.User.messages.in;
                break;
            case TabsMessage.Outgoing:
                this.currentLst = this.auth.User.messages.out;
                break;
        }
        
    }

    constructor(private srv: DataService, private auth: AuthService) {
    }

    private markAsRead(msg: IMessage) {
        console.log(msg)
    }
}
