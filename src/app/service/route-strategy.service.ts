import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class RouteStrategyService implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  public static deleteRouteSnapshot(path: string): void {
    // console.log(path);
    const name = path.replace(/\//g, '_');
    if (RouteStrategyService.handlers[name]) {
      delete RouteStrategyService.handlers[name];
    }
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log(future);
    // console.log(curr);
    return future.routeConfig === curr.routeConfig
      && JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.log(route);
    return true;
  }

  public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    // console.log(route);
    // console.log(detachedTree);
    RouteStrategyService.handlers[this.getPath(route)] = detachedTree;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.log(route);
    return !!RouteStrategyService.handlers[this.getPath(route)];
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // console.log(route);
    return RouteStrategyService.handlers[this.getPath(route)] || null;
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    // console.log(route);
    // tslint:disable-next-line: no-string-literal
    // @ts-ignore
    const path = route['_routerState'].url.replace(/\//g, '_');
    // console.log('path:', path);
    return path;
  }
}
