export interface SwaggerConfig{
    
    include?: Function[];
  
    
    extraModels?: Function[];
  
   
    ignoreGlobalPrefix?: boolean;
  
 
    deepScanRoutes?: boolean;
  
  
    operationIdFactory?: (controllerKey: string, methodKey: string) => string;
}