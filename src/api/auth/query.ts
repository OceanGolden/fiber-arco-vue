import * as AuthService from './service';

import { Message, Modal } from '@arco-design/web-vue';

import { TokenEnum } from '@/common/constants';
import Storage from '@/utils/storage';
import { useMutation } from '@tanstack/vue-query';
import type { LoginRequest } from './type';

export const useLoginMutation = (title: string = '登录') => {
  return useMutation({
    mutationFn: (req: Partial<LoginRequest>) => {
      const submit = AuthService.login;
      return submit(req);
    },
    onMutate: () => {
      Message.loading(`正在${title}...`);
    },
    onSuccess: (data) => {
      Message.clear();
      Message.success(`${title}成功`);
      Storage.set(TokenEnum.Access, data.access);
    },
    onError: () => {
      Message.clear();
      Message.error(`${title}失败`);
      Storage.remove(TokenEnum.Access);
    }
  });
};

export const useLogoutMutation = (title: string = '注销') => {
  const logoutMutation = useMutation({
    mutationFn: () => {
      const submit = AuthService.logout;
      return submit();
    },
    onMutate: () => {
      Message.loading(`正在${title}...`);
    },
    onSuccess: () => {
      Message.clear();
      Message.success(`${title}成功`);
      Storage.remove(TokenEnum.Access);
    },
    onError: () => {
      Message.clear();
      Message.error(`${title}失败`);
    }
  });

  const confirmLogout = (onSuccess: () => void) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确认要注销当前用户吗?',
      okButtonProps: { status: 'warning' },
      onOk: () => {
        logoutMutation.mutate(undefined, { onSuccess });
      }
    });
  };

  return { confirmLogout };
};
