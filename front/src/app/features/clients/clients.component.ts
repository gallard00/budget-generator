import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';

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

  async ngOnInit() {
    await this.loadClients();
  }

  async loadClients() {
    this.clients = await ClientService.getAll();
  }

  async createClient() {
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.address) return;
    await ClientService.create(this.newClient);
    this.newClient = { name: '', phone: '', address: '' };
    await this.loadClients();
  }

  async deleteClient(id?: number) {
    if (!id) return;
    try {
    await ClientService.delete(id);
    await this.loadClients(); // 🔄 refresca la lista
  } catch (err) {
    console.error('Error deleting client:', err);
  }
  }
}
