import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { getAllComments } from '../../+state/comments/comments.selectors';
import * as CommentsActions from '../../+state/comments/comments.actions';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  @Input() isPost: boolean;
  @Input() postId: number;
  blogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.buildBlogForm();
  }

  // TODO: quando tiver login colocar os dado usuário logado
  saveForm() {
    const payload = {
      title: this.blogForm.get('title').value,
      body: this.blogForm.get('body').value,
      postId: this.postId,
      name: 'Caio Alves',
      email: 'kaka@teste.com.br',
    };
    this.store.dispatch(CommentsActions.createComment({comment:payload}));
    this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  private buildBlogForm() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }
}