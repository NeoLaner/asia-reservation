interface Option {
  name: string;
  price: number;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  options: Option[];
  score: number;
}

interface WorkingHours {
  start: string;
  end: string;
}

export interface Artist {
  id: string;
  name: string;
  age: number;
  city: string;
  services: Service[];
  working_hours: WorkingHours;
}
