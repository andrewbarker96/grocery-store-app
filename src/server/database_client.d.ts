
declare module 'database_client' {
  export class Supabase {
    getItems(): Promise<any>;
    addItem(name: string, price: number, image: string): Promise<void>;
    deleteItem(id: number): Promise<void>;
    updateItem(id: number, name: string, price: number, image: string): Promise<void>;
    addUser(email: string, password: string): Promise<void>;
    changePassword(email: string, password: string): Promise<void>;
  }
}
