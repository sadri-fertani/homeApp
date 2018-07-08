import { Component } from '@angular/core';

import { DataService } from '../../srv/data.service';
import { AuthService } from '../../srv/auth.service';
import { IMessage } from '../../models/IMessage';
import { TabsMessage } from '../../models/TabsMessage';

@Component({
    selector: 'msgLst',
    templateUrl: './message.lst.component.html'
})
export class MessageLstComponent {

    private currentTab: TabsMessage;

    constructor(private srv: DataService, private auth: AuthService) {
        this.currentTab = TabsMessage.Incoming;
        
        // this.srv.getUsers().subscribe(
        //     data => this.lstUsers = data,
        //     err => console.log(err)
        // );
    }

    private switchTabs(newCurrentTabs: TabsMessage): void {
        this.currentTab = newCurrentTabs;
    }
}
