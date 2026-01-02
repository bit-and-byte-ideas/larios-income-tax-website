import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shared Module
 *
 * This module contains shared components, directives, and pipes
 * that can be used across different feature modules.
 *
 * Import this module in feature modules that need shared functionality.
 */
@NgModule({
  declarations: [
    // Add shared components, directives, and pipes here
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
    // Export shared components, directives, and pipes here
  ]
})
export class SharedModule { }
