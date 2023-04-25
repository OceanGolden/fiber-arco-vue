import type { App, Directive, DirectiveBinding } from 'vue';

import usePermission from '@/hooks/usePermission';

function isAuth(el: Element, binding: any) {
  const { checkPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!checkPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted
};

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
}

export default authDirective;
