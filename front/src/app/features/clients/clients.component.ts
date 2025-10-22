// ✅ Importaciones esenciales de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ✅ Importación del servicio de clientes y del modelo correspondiente
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-clients', // Nombre del selector HTML del componente
  standalone: true,        // Define que no depende de un módulo global
  imports: [CommonModule, FormsModule], // Permite usar *ngFor, *ngIf y [(ngModel)]
  templateUrl: './clients.component.html', // Archivo de template HTML asociado
  styleUrls: ['./clients.component.scss']  // Estilos específicos del componente
})
export class ClientsComponent implements OnInit {

  /**
   * 👥 Arreglo que almacena la lista completa de clientes
   * 
   * Este array se llena con los datos devueltos por el backend a través de ClientService.
   * Se usa en el template con *ngFor para renderizar la tabla de clientes.
   */
  clients: Client[] = [];

  /**
   * 🆕 Objeto temporal usado para crear un nuevo cliente
   * 
   * Está vinculado por *two-way data binding* con [(ngModel)] en el formulario.
   * Cada campo (name, phone, address) se llena desde la vista.
   */
  newClient: Client = { name: '', phone: '', address: '' };

  /**
   * 🧠 Hook de ciclo de vida: ngOnInit()
   * 
   * Se ejecuta automáticamente cuando el componente se inicializa.
   * Aquí se llama a `loadClients()` para cargar la lista desde el backend.
   */
  async ngOnInit() {
    await this.loadClients();
  }

  /**
   * 🔄 Carga todos los clientes desde el backend usando ClientService
   * 
   * - Llama al método GET del servicio (axios.get).
   * - Asigna el resultado al array local `clients`.
   * - Esto actualiza automáticamente la vista (data binding).
   */
  async loadClients() {
    this.clients = await ClientService.getAll();
  }

  /**
   * ➕ Crea un nuevo cliente
   * 
   * - Valida que los campos no estén vacíos.
   * - Envía la petición POST con los datos del nuevo cliente.
   * - Limpia el formulario (`newClient`) para poder registrar otro.
   * - Recarga la lista para mostrar el cliente recién creado.
   */
  async createClient() {
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.address) return;
    await ClientService.create(this.newClient);
    this.newClient = { name: '', phone: '', address: '' };
    await this.loadClients();
  }

  /**
   * ❌ Elimina un cliente existente por su ID
   * 
   * - Recibe un `id` como parámetro (opcional).
   * - Si el id es válido, llama a `ClientService.delete(id)`.
   * - Luego vuelve a ejecutar `loadClients()` para refrescar la lista en pantalla.
   * - Se usa un bloque try/catch para manejar errores HTTP o de conexión.
   */
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
