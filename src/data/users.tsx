export interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    occupation: string;
    income: number;
  }
  
  export const users: User[] = [
    { id: 1, name: 'Ram Kumar', age: 45, gender: 'Male', occupation: 'Farmer', income: 180000 },
    { id: 2, name: 'Lakshmi Devi', age: 38, gender: 'Female', occupation: 'Dairy Farmer', income: 150000 },
    { id: 3, name: 'Suresh Yadav', age: 52, gender: 'Male', occupation: 'Village Sarpanch', income: 240000 },
    { id: 4, name: 'Geeta Kumari', age: 29, gender: 'Female', occupation: 'Anganwadi Worker', income: 120000 },
    { id: 5, name: 'Mohan Singh', age: 61, gender: 'Male', occupation: 'Carpenter', income: 160000 },
    { id: 6, name: 'Priya Sharma', age: 33, gender: 'Female', occupation: 'Tailor', income: 140000 },
    { id: 7, name: 'Rajesh Patel', age: 42, gender: 'Male', occupation: 'Small Shop Owner', income: 200000 },
    { id: 8, name: 'Anita Ben', age: 35, gender: 'Female', occupation: 'Weaver', income: 130000 },
    { id: 9, name: 'Krishna Verma', age: 48, gender: 'Male', occupation: 'Potter', income: 145000 },
    { id: 10, name: 'Meena Devi', age: 40, gender: 'Female', occupation: 'Dairy Farmer', income: 155000 },
    { id: 11, name: 'Sanjay Kumar', age: 37, gender: 'Male', occupation: 'Farmer', income: 175000 },
    { id: 12, name: 'Radha Kumari', age: 31, gender: 'Female', occupation: 'ASHA Worker', income: 110000 },
    { id: 13, name: 'Vijay Singh', age: 55, gender: 'Male', occupation: 'Blacksmith', income: 170000 },
    { id: 14, name: 'Sunita Devi', age: 44, gender: 'Female', occupation: 'Vegetable Vendor', income: 125000 },
    { id: 15, name: 'Raju Yadav', age: 39, gender: 'Male', occupation: 'Auto Driver', income: 165000 },
    { id: 16, name: 'Kavita Ben', age: 36, gender: 'Female', occupation: 'Handicraft Artist', income: 135000 },
    { id: 17, name: 'Dinesh Kumar', age: 50, gender: 'Male', occupation: 'Farmer', income: 185000 },
    { id: 18, name: 'Savita Kumari', age: 34, gender: 'Female', occupation: 'Tailor', income: 140000 },
    { id: 19, name: 'Prakash Sharma', age: 47, gender: 'Male', occupation: 'Carpenter', income: 160000 },
    { id: 20, name: 'Usha Devi', age: 41, gender: 'Female', occupation: 'Dairy Farmer', income: 150000 },
    { id: 21, name: 'Arun Kumar', age: 43, gender: 'Male', occupation: 'Small Shop Owner', income: 195000 },
    { id: 22, name: 'Rekha Ben', age: 32, gender: 'Female', occupation: 'Weaver', income: 130000 },
    { id: 23, name: 'Manoj Verma', age: 49, gender: 'Male', occupation: 'Potter', income: 145000 },
    { id: 24, name: 'Shanti Devi', age: 38, gender: 'Female', occupation: 'Vegetable Vendor', income: 125000 },
    { id: 25, name: 'Rakesh Yadav', age: 45, gender: 'Male', occupation: 'Auto Driver', income: 165000 },
    { id: 26, name: 'Anjali Kumari', age: 30, gender: 'Female', occupation: 'ASHA Worker', income: 110000 },
    { id: 27, name: 'Gopal Singh', age: 54, gender: 'Male', occupation: 'Farmer', income: 180000 },
    { id: 28, name: 'Lata Devi', age: 42, gender: 'Female', occupation: 'Tailor', income: 140000 },
    { id: 29, name: 'Ramesh Kumar', age: 51, gender: 'Male', occupation: 'Carpenter', income: 160000 },
    { id: 30, name: 'Sita Ben', age: 37, gender: 'Female', occupation: 'Weaver', income: 130000 },
    { id: 31, name: 'Bharat Verma', age: 46, gender: 'Male', occupation: 'Potter', income: 145000 },
    { id: 32, name: 'Maya Devi', age: 39, gender: 'Female', occupation: 'Dairy Farmer', income: 150000 },
    { id: 33, name: 'Kishan Kumar', age: 44, gender: 'Male', occupation: 'Small Shop Owner', income: 190000 },
    { id: 34, name: 'Pushpa Kumari', age: 35, gender: 'Female', occupation: 'Handicraft Artist', income: 135000 },
    { id: 35, name: 'Sunil Yadav', age: 48, gender: 'Male', occupation: 'Auto Driver', income: 165000 },
    { id: 36, name: 'Manju Ben', age: 33, gender: 'Female', occupation: 'Anganwadi Worker', income: 120000 },
    { id: 37, name: 'Rajendra Singh', age: 53, gender: 'Male', occupation: 'Farmer', income: 175000 },
    { id: 38, name: 'Kamla Devi', age: 40, gender: 'Female', occupation: 'Vegetable Vendor', income: 125000 },
    { id: 39, name: 'Deepak Kumar', age: 36, gender: 'Male', occupation: 'Carpenter', income: 160000 },
    { id: 40, name: 'Rani Kumari', age: 31, gender: 'Female', occupation: 'Tailor', income: 140000 },
    { id: 41, name: 'Santosh Verma', age: 47, gender: 'Male', occupation: 'Potter', income: 145000 },
    { id: 42, name: 'Sheela Ben', age: 34, gender: 'Female', occupation: 'Weaver', income: 130000 },
    { id: 43, name: 'Vinod Kumar', age: 50, gender: 'Male', occupation: 'Small Shop Owner', income: 185000 },
    { id: 44, name: 'Anita Devi', age: 38, gender: 'Female', occupation: 'Dairy Farmer', income: 150000 },
    { id: 45, name: 'Ashok Yadav', age: 45, gender: 'Male', occupation: 'Auto Driver', income: 165000 },
    { id: 46, name: 'Sarla Kumari', age: 32, gender: 'Female', occupation: 'ASHA Worker', income: 110000 },
    { id: 47, name: 'Mahesh Singh', age: 52, gender: 'Male', occupation: 'Blacksmith', income: 170000 },
    { id: 48, name: 'Kanta Devi', age: 41, gender: 'Female', occupation: 'Vegetable Vendor', income: 125000 },
    { id: 49, name: 'Umesh Kumar', age: 49, gender: 'Male', occupation: 'Farmer', income: 180000 },
    { id: 50, name: 'Nirmala Ben', age: 36, gender: 'Female', occupation: 'Handicraft Artist', income: 135000 }
  ];
  