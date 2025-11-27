import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente de gestión de clientes.
 * SRP: solo maneja estado de UI.
 */
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  newClient: Client = { name: '', phone: '', address: '' };

  // === MODAL ===
  showEditModal = false;
  editId: number | null = null;
  editModel: Client = { name: '', phone: '', address: '' };

  constructor(
    private clientService: ClientService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  createClient(): void {
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.address) return;

    this.clientService.create(this.newClient).subscribe(() => {
      this.newClient = { name: '', phone: '', address: '' };
      this.loadClients();
    });
  }

  // ===== MODAL =====

  openEditModal(client: Client): void {
    if (!this.auth.isAdmin()) return;

    this.editId = client.id!;
    this.editModel = { ...client };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.editId = null;
    this.editModel = { name: '', phone: '', address: '' };
    this.showEditModal = false;
  }

  saveFromModal(): void {
    if (!this.editId) return;

    this.clientService.update(this.editId, this.editModel).subscribe(() => {
      this.closeEditModal();
      this.loadClients();
    });
  }

  deleteClient(id?: number): void {
    if (!id || !this.auth.isAdmin()) return;

    this.clientService.delete(id).subscribe(() => this.loadClients());
  }
}

