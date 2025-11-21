import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente encargado de gestionar los clientes.
 * 
 * Responsabilidades (SRP):
 * - Mostrar lista de clientes
 * - Crear nuevos clientes
 * - Editar clientes existentes
 * - Eliminar clientes (solo ADMIN)
 * 
 * No contiene lógica de negocio ni HTTP:
 * toda la comunicación con la API está delegada al ClientService,
 * lo que cumple el principio de inversión de dependencias (DIP).
 */
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  /** Lista de clientes cargados desde el backend */
  clients: Client[] = [];

  /** Modelo para crear un cliente nuevo */
  newClient: Client = { name: '', phone: '', address: '' };

  /** Modo edición */
  editId: number | null = null;

  /** Modelo temporal para edición */
  editModel: Client = { name: '', phone: '', address: '' };

  constructor(
    private clientService: ClientService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  /** Carga los clientes desde la API */
  loadClients(): void {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  /** Crea un nuevo cliente */
  createClient(): void {
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.address) return;

    this.clientService.create(this.newClient).subscribe(() => {
      this.newClient = { name: '', phone: '', address: '' };
      this.loadClients();
    });
  }

  /** Entra en modo edición */
  startEdit(c: Client): void {
    if (!this.auth.isAdmin()) return;

    this.editId = c.id!;
    this.editModel = { ...c }; // copia profunda
  }

  /** Cancela la edición actual */
  cancelEdit(): void {
    this.editId = null;
    this.editModel = { name: '', phone: '', address: '' };
  }

  /** Guarda los cambios del cliente editado */
  saveEdit(): void {
    if (this.editId == null) return;

    this.clientService.update(this.editId, this.editModel).subscribe(() => {
      this.cancelEdit();
      this.loadClients();
    });
  }

  /** Elimina un cliente (solo ADMIN) */
  deleteClient(id?: number): void {
    if (!id || !this.auth.isAdmin()) return;

    this.clientService.delete(id).subscribe(() => this.loadClients());
  }
}
