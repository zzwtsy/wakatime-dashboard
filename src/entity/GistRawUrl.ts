export interface File {
  filename: string;
  raw_url: string;
}

export interface Owner {
  login: string;
}

export interface GistRawUrl {
  files: Record<string, File>;
  owner: Owner;
}
