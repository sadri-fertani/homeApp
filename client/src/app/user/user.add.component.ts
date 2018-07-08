import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../srv/data.service';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../srv/auth.service';
import { IStatut } from '../../models/IStatut';

@Component({
    selector: 'userAdd',
    templateUrl: './user.add.component.html'
})
export class UserAddComponent {
    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public admin: AbstractControl;
    private statut: IStatut;

    constructor(fb: FormBuilder, private router: Router, private srv: DataService, private auth: AuthService) {
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'admin': ['', Validators.compose([Validators.required])]
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.admin = this.form.controls['admin'];

        this.statut = {
            success: false,
            error: false,
            userMessage: ''
        } as IStatut;
    }

    public onSubmit(values: any): void {

        // init
        this.statut = {
            success: false,
            error: false,
            userMessage: ''
        } as IStatut;

        if (this.form.valid) {
            this.srv.addUser(values as IUser).subscribe(
                data => {
                    // Save signin Data in localstorage
                    if (data.success) {
                        console.log(data);
                        this.statut.success = true;
                        this.statut.userMessage = 'User added successfully';
                        this.form.reset();
                    };
                },
                err => {
                    console.log(err);
                    this.statut.error = true;
                    this.statut.userMessage = 'Error...';
                }
            )
        }
    }
}
