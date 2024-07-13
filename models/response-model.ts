export default interface ResponseModel<T>{
    success: boolean;
    message: string;
    data: T;
}