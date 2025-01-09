import { Component, OnInit } from '@angular/core';
import { BaseFirebaseRepositoryService } from '../services/base-firebase-repository.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Persona {
  id?: string; // ID del documento en Firestore
  name: string; // Nombre de la persona
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{


  mode:'new'|'edit' = 'new';
  _personas:BehaviorSubject<Persona[]> = new BehaviorSubject<Persona[]>([]);
  personas$:Observable<Persona[]> = this._personas.asObservable();
  private collectionName = 'personas';

  formGroup: FormGroup;

  constructor(private firebaseService: BaseFirebaseRepositoryService<Persona>,
    private fb: FormBuilder
  ) {

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.firebaseService.getAll(this.collectionName).subscribe((data) => {
        this._personas.next(data)
      
    });
  }

  loadPerson(){
    this.firebaseService.getAll(this.collectionName).subscribe((data) => {
        this._personas.next(data)

    });
  }


  addPersona( newPersona: Persona) {
    this.firebaseService.add(this.collectionName, newPersona).subscribe(() => {
      next: (response: Persona) =>{
        this._personas.next([...this._personas.value, response])
      }
      
    });
  }

  updatePersona(persona: Persona) {
    if (persona.id) {
      this.firebaseService
        .update(this.collectionName, persona.id, persona)
        .subscribe(() => {
          this.loadPerson()
        });
    }
  }

  deletePersona(persona: Persona) {
    if (persona.id) {
      this.firebaseService.delete(this.collectionName, persona.id).subscribe(() => {
        this.loadPerson()
      });
    }
  }


  onSubmit() {
    if (this.formGroup.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const formData = this.formGroup.value as Persona;

    if (this.mode === 'new') {
      this.addPersona(formData);
    } else {
      // Actualización: Aquí podrías pasar el ID si estás editando
    }

    // Limpia el formulario y cambia a modo 'new'
    this.formGroup.reset();
    this.mode = 'new';
  }

  

}
