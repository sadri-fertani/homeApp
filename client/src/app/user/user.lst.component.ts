import { Component, ViewChild, ElementRef } from '@angular/core';

import { IUser } from '../../models/IUser';
import { DataService } from '../../srv/data.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../srv/auth.service';
import * as $ from 'jquery';
import { IMessage } from '../../models/IMessage';
import { IStatut } from '../../models/IStatut';

@Component({
    selector: 'userLst',
    templateUrl: './user.lst.component.html'
})
export class UserLstComponent {
    private lstUsers: Array<IUser>;
    private user: IUser;
    public form: FormGroup;
    public title: AbstractControl;
    public message: AbstractControl;
    private statut: IStatut;
    
    @ViewChild('myModal')
    private myModal: ElementRef;

    constructor(fb: FormBuilder, private srv: DataService, private auth: AuthService) {
        this.srv.getUsers().subscribe(
            data => this.lstUsers = data,
            err => console.log(err)
        );

        this.form = fb.group({
            'title': ['', Validators.compose([Validators.required])],
            'message': ['', Validators.compose([Validators.required])]
        });

        this.title = this.form.controls['title'];
        this.message = this.form.controls['message'];

        this.statut = {
            success: false,
            error: false,
            userMessage: ''
        } as IStatut;
    }

    initModalMesssage(user: IUser): void {
        this.user = user;
        this.form.reset();
        // init
        this.statut = {
            success: false,
            error: false,
            userMessage: ''
        } as IStatut;
    }

    sendMesssage(user: IUser, title: string, body: string): void {
        // Create message
        let msg = {
            _idSender: this.auth.User._id,
            sender: this.auth.User.name,
            _idTarget: user._id,
            target: user.name,
            title: title,
            body: body,
            readed: false,
            date: new Date().toISOString()
        } as IMessage;

        this.srv.sendMessage(msg).subscribe(
            data => {
                if (data.success) {
                    console.log(data);
                    this.statut.success = true;
                    this.statut.userMessage = 'Message sent successfully';
                    this.form.reset();
                };
            },
            err => {
                console.log(err);
                this.statut.error = true;
                this.statut.userMessage = 'Error...';
            }
        );

        this.myModal.nativeElement.click();
    }
}
