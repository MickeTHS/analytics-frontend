/*
A customer can own multiple entities

The top entities within a customer is "Sites". 

A site can be a topdomain, subdomain or subfolders within a domain.

The next level of the entity tree is tracking pages, sections or funnel steps:

[Customer]
  - [Entity] Site
    - [Entity] Page
      - [Entity] Section
    - [Entity] Funnel step
*/

export enum Entity_type {
  VALIDATION,
  SITE,
  PAGE,
  SECTION,
  FU_STEP,
}

export enum Entity_status {
  PENDING, /// waiting for a user to verify
  VERIFIED, /// has been verified working
  TIMEOUT /// has timed out (if created_at + 3 days < now)
}

export interface Entity {
  id:           number,
  type:         string,
  name:         string,
  url:          string,
  parent_id:    number,
  created_at:   number,
  description:  string,
  status:       string, /// Entity status
  last_visit_at: number,
  hits:         number,
  customer_id:  number,
  region:       string,
}