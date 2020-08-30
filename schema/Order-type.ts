
export default interface Order {
  email: string,
  firstName: string,
  lastName: string
  _id: string,
  time: string,
  jobDate: string,
  services?: [string],
}