import { ExceptionFilter } from "@nestjs/common";

export class CatchAll<T extends Error> implements ExceptionFilter {
    catch(exception: T, response: any): void {
       console.log(exception);
    }
}