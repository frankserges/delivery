export class Delivery{
  delivery_id?:string;
  package_id?:string;
  pickup_time!:Date;
  start_time!:Date;
  end_time!:Date;
  location?:object;
  status!:string;

}
