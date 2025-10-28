import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';
import { AuthService } from '../../core/services/auth.service';

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

  // edición
  editId: number | null = null;
  editModel: Client = { name: '', phone: '', address: '' };

  constructor(private clientService: ClientService, public auth: AuthService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  createClient() {
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.address) return;
    this.clientService.create(this.newClient).subscribe(() => {
      this.newClient = { name: '', phone: '', address: '' };
      this.loadClients();
    });
  }

  startEdit(c: Client) {
    if (!this.auth.isAdmin()) return;
    this.editId = c.id!;
    this.editModel = { ...c };
  }

  cancelEdit() {
    this.editId = null;
    this.editModel = { name: '', phone: '', address: '' };
  }

  saveEdit() {
    if (this.editId == null) return;
    this.clientService.update(this.editId, this.editModel).subscribe(() => {
      this.cancelEdit();
      this.loadClients();
    });
  }

  deleteClient(id?: number) {
    if (!id || !this.auth.isAdmin()) return;
    this.clientService.delete(id).subscribe(() => this.loadClients());
  }
}
