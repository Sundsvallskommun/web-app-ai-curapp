export interface ResponseData {
  session_id: string;
  answer: string;
  references: {
    id: string;
    text: string | null;
    metadata: {
      url: string | null;
      title: string;
      embedding_model: string;
    };
    group_id: string;
  }[];
  model: {
    name: string;
    nickname: string;
    family: string;
    token_limit: number;
    selectable: boolean;
  };
}
