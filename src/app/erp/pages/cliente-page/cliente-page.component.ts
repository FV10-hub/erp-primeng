import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interface/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService],
})
export class ClientePageComponent implements OnInit {
  public clientes: Cliente[] = [];
  public clienteSelected: Cliente = {
    nombreCompleto: '',
    documento: '',
    telefono: '',
    chapa: '',
    createAt: new Date(),
    id: 0,
  };
  public clienteDialog: boolean = false;
  public submitted: boolean = false;

  constructor(
    private clienteService: ClientesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  hideDialog() {
    this.clienteDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.clienteSelected = {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      chapa: '',
      createAt: new Date(),
      id: 0,
    };
    this.submitted = false;
    this.clienteDialog = true;
  }

  getClientes(){
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  editCliente(cliente: Cliente) {
    this.clienteSelected = { ...cliente };
    this.clienteDialog = true;
  }

  deleteCliente(cliente: Cliente) {
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar a ' + cliente.nombreCompleto + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.clienteService
          .deleteCliente(cliente.id)
          .subscribe((mensaje) => console.log(mensaje));
        this.clientes = this.clientes.filter((val) => val.id !== cliente.id);
        this.clienteSelected = {
          nombreCompleto: '',
          documento: '',
          telefono: '',
          chapa: '',
          createAt: new Date(),
          id: 0,
        };
        this.messageService.add({
          severity: 'error',
          summary: 'Hecho',
          detail: 'Cliente Eliminado',
          life: 3000,
        });
      },
    });
  }

  guardar() {
    if (this.clienteSelected.id > 0) {
      console.log(this.clienteSelected);
      this.clienteService.updateCliente(this.clienteSelected).subscribe(
        (clienteActualizado) => {
          if (clienteActualizado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Hecho',
              detail: 'Cliente Actualizado',
              life: 3000,
            });
            this.clienteDialog = false;
            this.router.navigate(['/cliente']);
          }
        },
        (err) => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error);
        }
      );
      this.getClientes();
      return;
    }
    //delete this.clienteSelected.id;
    console.log(JSON.stringify(this.clienteSelected) );
    this.clienteService.create(this.clienteSelected).subscribe(
      (cliente) => {
        this.clientes.push(cliente);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Cliente Creado',
          life: 3000,
        });
        this.clienteDialog = false;
        this.getClientes();
        this.router.navigate(['/cliente']);
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    );
  }
}
