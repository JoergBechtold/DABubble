import { Component, inject, ViewChild } from '@angular/core';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { filter, firstValueFrom, take } from 'rxjs';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { DlgProfileMenuComponent } from '../dlg-profile-menu/dlg-profile-menu.component';

@Component({
  selector: 'app-profile-menu',
  imports: [CommonModule, PortalModule, DlgProfileMenuComponent],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  facade = inject(UsersFacadeService);
  auth = inject(AuthService);
  router = inject(Router);
  @ViewChild(CdkPortal) portal!: CdkPortal;
  
  readonly user = toSignal(this.facade.currentUser(), { initialValue: null });

  constructor(private overlay: Overlay) {

  }

  openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().right("16px").top("120px"),
      hasBackdrop: true
    });
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
