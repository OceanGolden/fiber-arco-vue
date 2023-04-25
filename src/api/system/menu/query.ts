import * as MenuService from './service';

import { SystemStatusEnum, SystemTreeRoot } from '@/common/constants';
import { Message, Modal, TreeNodeData } from '@arco-design/web-vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Ref, computed, h } from 'vue';
import type { MenuParams, MenuRecord, MenuRequest } from './type';

import DynamicIcon from '@/components/dynamic_icon/index.vue';
import type { UseQueryOptions } from '@tanstack/vue-query';

export enum QueryKeys {
  query = 'menu-query'
}

const convertMenuToTreeNode = (menus: MenuRecord[]): TreeNodeData[] => {
  return menus.map((menu) => {
    const node: TreeNodeData = {
      key: menu.id,
      title: menu.name,
      children: menu.children ? convertMenuToTreeNode(menu.children) : undefined
    };
    if (menu.icon) {
      node.icon = () => [h(DynamicIcon, { icon: menu.icon })];
    }
    return node;
  });
};
export const useMenus = (
  params: Ref<Partial<MenuParams>>,
  options?: UseQueryOptions<MenuRecord[]>
) => {
  const queryInfo = useQuery<MenuRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => MenuService.queryTreeAll(params.value),
    ...options
  });
  return {
    ...queryInfo,
    treeSelectData: computed(() =>
      convertMenuToTreeNode(
        [
          {
            id: SystemTreeRoot.Root as string,
            name: '根目录',
            status: SystemStatusEnum.Enable as string
          } as MenuRecord
        ].concat(queryInfo.data.value || [])
      )
    ),
    treeData: computed(() => convertMenuToTreeNode(queryInfo.data.value || []))
  };
};

export const useMenusTree = (
  params: Partial<MenuParams>,
  options?: UseQueryOptions<MenuRecord[]>
) => {
  const queryInfo = useQuery({
    queryKey: [QueryKeys.query, params],
    queryFn: () => MenuService.queryTreeAll(params),
    ...options
  });
  return {
    ...queryInfo
  };
};

export const useMenuMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<MenuRequest>) => {
      const submit = req.id ? MenuService.update : MenuService.create;
      return submit(req);
    },
    onMutate: () => {
      Message.loading(`正在${title}数据...`);
    },
    onSuccess: () => {
      Message.clear();
      Message.success(`${title}成功`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      Message.clear();
      Message.error(`${title}失败`);
    }
  });
};

export const useMenuDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<MenuRequest>) => {
      return MenuService.remove(req);
    },
    {
      onMutate: (variables) => {
        Message.loading(`正在删除${variables.name}数据...`);
      },
      onSuccess: (_, variables) => {
        Message.clear();
        Message.success(`${variables.name}删除成功`);
        queryClient.invalidateQueries([QueryKeys.query]);
      },
      onError: (_, variables) => {
        Message.clear();
        Message.error(`${variables.name}删除失败`);
      }
    }
  );

  const confirmRemove = (record: Partial<MenuRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选菜单?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation.mutate(record)
    });
  };

  return { deleteMutation, confirmRemove };
};
