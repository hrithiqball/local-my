export class BaseFilter {
  q?: string
  page: number
  size: number
  offset: number
  sort: 'asc' | 'desc'

  constructor(
    q?: string,
    page: number = 1,
    size: number = 20,
    offset: number = 0,
    sort: 'asc' | 'desc' = 'asc'
  ) {
    this.q = q
    this.page = page
    this.size = size
    this.offset = offset
    this.sort = sort
  }

  toQueryString(): string {
    const params = new URLSearchParams()
    if (this.q) params.append('q', this.q)
    if (this.page) params.append('page', this.page.toString())
    if (this.size) params.append('size', this.size.toString())
    if (this.offset) params.append('offset', this.offset.toString())
    if (this.sort) params.append('sort', this.sort)
    return params.toString()
  }
}
