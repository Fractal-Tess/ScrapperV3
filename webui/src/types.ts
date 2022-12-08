export interface Endpoint {
  path: string
  identifier: {
    name?: string
    kind: string
    type: string
  }
}
