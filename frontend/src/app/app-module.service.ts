import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppModuleService {
  private loader: NgModuleFactoryLoader;
  private injector: Injector;
  private compiler: Compiler;
  private modules: any = {};

  constructor(loader: NgModuleFactoryLoader, injector: Injector, compiler: Compiler) {
    this.loader = loader;
    this.injector = injector;
    this.compiler = compiler;
  }

  public loadModule(module: string) {
    return this.loader.load(module).then(((m: NgModuleFactory<any>) => {
      let compiled = this.compiler.compileModuleAndAllComponentsSync(m.moduleType);

      return {
        type: m.moduleType,
        module: m.create(this.injector),
        components: this.getComponents(compiled.componentFactories),
        name: m.moduleType.name
      };
    }));
  }

  private getComponents(factories: any[]) {
    return factories.reduce((prev, curr) => {
      prev[curr.componentType.name] = {
        factory: curr,
        component: curr.componentType
      };

      return prev;
    }, {});
  }

  public loadComponent(module: string, component: string) {
    // return this.modules[module].
  }

  private resolveComponent(module: NgModuleFactory<any>, component) {
    return this.compiler.compileModuleAndAllComponentsSync(module.moduleType);
  }
}
