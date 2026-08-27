import {
  createLead as createLeadRequest,
  getBffSettings as getBffSettingsRequest,
  getMenu as getMenuRequest,
  getPageBySlug as getPageBySlugRequest,
  getSections as getSectionsRequest,
  getSiteInfo as getSiteInfoRequest,
  validateUnderConstructionToken as validateUnderConstructionTokenRequest,
} from './generated/sdk.gen'
import type { LeadRequest, UnderConstructionTokenRequest } from './generated/types.gen'

/**
 * Compatibility facade for the public API used by the site services.
 *
 * The generated SDK remains the HTTP boundary; this facade keeps the
 * previous service names and request-body shape stable for the application.
 */
export class BffPublicService {
  static getPageBySlug(parameters: { slug: string }) {
    return getPageBySlugRequest({ path: parameters })
  }

  static createLead(parameters: { requestBody: LeadRequest }) {
    return createLeadRequest({ body: parameters.requestBody })
  }

  static getBffSettings() {
    return getBffSettingsRequest()
  }

  static getSections() {
    return getSectionsRequest()
  }

  static getMenu() {
    return getMenuRequest()
  }

  static validateUnderConstructionToken(parameters: { requestBody: UnderConstructionTokenRequest }) {
    return validateUnderConstructionTokenRequest({ body: parameters.requestBody })
  }
}

export class BffSiteService {
  static getSiteInfo() {
    return getSiteInfoRequest()
  }
}

export type {
  BffMediaItem as BffMediaItemDto,
  BffPageDetail as BffPageDetailDto,
  BffPageSection as BffPageSectionDto,
  BffSection as BffSectionDto,
  BffSiteSettings as BffSiteSettingsDto,
} from './generated/types.gen'
