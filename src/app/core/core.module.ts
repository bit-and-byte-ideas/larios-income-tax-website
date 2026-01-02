import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Core Module
 *
 * This module is imported only once in the AppModule.
 * It contains singleton services, guards, and interceptors.
 *
 * The constructor ensures it's only imported once.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Add singleton services here
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
