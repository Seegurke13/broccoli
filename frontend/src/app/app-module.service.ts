import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppModuleService {
  private loader: NgModuleFactoryLoader;
  private injector: Injector;
  private compiler: Compiler;
  private cache = {};

  constructor(loader: NgModuleFactoryLoader, injector: Injector, compiler: Compiler) {
    this.loader = loader;
    this.injector = injector;
    this.compiler = compiler;
  }

  public loadModule(module: string) {
    if (this.cache[module]) {
      return new Promise((resolve) => {
        resolve(this.cache[module]);
      });
    }

    return this.loader.load(module).then(((m: NgModuleFactory<any>) => {
      let compiled = this.compiler.compileModuleAndAllComponentsSync(m.moduleType);

      let moduleInfo = {
        type: m.moduleType,
        module: m.create(this.injector),
        components: this.getComponents(compiled.componentFactories),
        name: m.moduleType.name
      };
      this.cache[module] = moduleInfo;

      return moduleInfo;
    }));
  }

  private getComponents(factories: any[]) {
    return factories.reduce((prev, curr) => {
      prev[curr.componentType.name] = {
        factory: curr,
        type: curr.componentType
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
