
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { IResponseAuthentification } from '../models/IResponseAuthentification';
import { IMessage } from '../models/IMessage';

@Injectable()

export class DataService {

  constructor(public http: HttpClient) {

  }

  public signin(u: IUser): Observable<IResponseAuthentification> {
    const body = new HttpParams()
      .append('email', u.email)
      .append('password', Md5.hashStr(u.password).toString())
      .toString();

    return this.http.post<IResponseAuthentification>('http://localhost:8080/api/authenticate', body);
  }

  public getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('http://localhost:8080/api/users');
  }

  public addUser(u: IUser): Observable<IResponseAuthentification> {

    const body = new HttpParams()
      .append('name', u.name)
      .append('email', u.email)
      .append('password', 'defaultmdp')
      .append('admin', u.admin.toString())
      .toString();

    return this.http.post<IResponseAuthentification>('http://localhost:8080/api/user/add', body);
  }

  public sendMessage(msg: IMessage): Observable<IResponseAuthentification> {

    const body = new HttpParams()
      .append('_idSender', msg._idSender)
      .append('sender', msg.sender)
      .append('_idTarget', msg._idTarget)
      .append('target', msg.target)
      .append('title', msg.title)
      .append('body', msg.body)
      .append('readed', msg.readed.toString())
      .append('date', msg.date)
      .toString();
      
    return this.http.post<IResponseAuthentification>('http://localhost:8080/api/user/sendmsg', body);
  }
}