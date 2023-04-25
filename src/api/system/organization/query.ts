import * as OrganizationService from './service';

import { SystemStatusEnum, SystemTreeRoot } from '@/common/constants';
import { Message, Modal, TreeNodeData } from '@arco-design/web-vue';
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/vue-query';
import type {
  OrganizationParams,
  OrganizationRecord,
  OrganizationRequest
} from './type';

import { Ref } from 'vue';

export enum QueryKeys {
  query = 'organization-query'
}

export const useOrganizations = (
  params: Ref<Partial<OrganizationParams>>,
  options?: UseQueryOptions<OrganizationRecord[]>
) => {
  const queryInfo = useQuery<OrganizationRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => OrganizationService.queryTree(params.value),
    ...options
  });
  return {
    ...queryInfo,
    treeData: [
      {
        id: SystemTreeRoot.Root as string,
        name: '顶级组织',
        status: SystemStatusEnum.Enable as string
      } as TreeNodeData
    ].concat(queryInfo.data.value || [])
  };
};

export const useOrganizationMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<OrganizationRequest>) => {
      const submit = req.id
        ? OrganizationService.update
        : OrganizationService.create;
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

export const useOrganizationDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<OrganizationRequest>) => {
      return OrganizationService.remove(req);
    },
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
  });

  const confirmRemove = (record: Partial<OrganizationRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选组织?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation.mutate(record)
    });
  };

  return { deleteMutation, confirmRemove };
};
