
export interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    description: string;
    gender: string;
    size: string;
    weight: string;
    birthday: string;
    age: string;
    avatar: any;
  }
  
  // Dados mockados dos pets
  export const mockPets: Pet[] = [
    {
      id: '1',
      name: 'Billy',
      type: 'Cachorro',
      breed: 'Cocker Spaniel',
      description: 'Pelagem caramelo ondulada, orelhas longas e caídas, olhos castanhos.',
      gender: 'Macho',
      size: 'Médio',
      weight: '16.2',
      birthday: '2022-01-03',
      age: '3 anos',
      avatar: require('../../assets/images/DogAvatar.png')
    },
    {
      id: '2',
      name: 'Luna',
      type: 'Gato',
      breed: 'Siamês',
      description: 'Pelagem clara com extremidades escuras, olhos azuis brilhantes, porte elegante e ágil.',
      gender: 'Fêmea',
      size: 'Pequeno',
      weight: '4.5',
      birthday: '2023-04-15',
      age: '2 anos',
      avatar: require('../../assets/images/GatoImage.png')
    },
    {
      id: '3',
      name: 'Max',
      type: 'Cachorro',
      breed: 'Golden Retriever',
      description: 'Pelagem dourada brilhante, porte atlético, personalidade dócil e brincalhona.',
      gender: 'Macho',
      size: 'Grande',
      weight: '32.1',
      birthday: '2021-08-22',
      age: '4 anos',
      avatar: require('../../assets/images/Golden.png')
    }
  ];
  

  export const getPetById = (id: string): Pet | undefined => {
    return mockPets.find(pet => pet.id === id);
  };