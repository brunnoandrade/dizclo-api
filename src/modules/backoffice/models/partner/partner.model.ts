import { User } from 'src/modules/backoffice/models/user.model';
import { PartnerPhoto } from 'src/modules/backoffice/models/partner/photo';
import { PartnerView } from 'src/modules/backoffice/models/partner/view';

export class Partner {
  constructor(
    public name: string,
    public userName: string,
    public email: string,
    public avatar: string,
    public stars: number,
    public latitude: string,
    public longitude: string,
    public photos: PartnerPhoto[],
    public views: PartnerView[],
    public user: User,
  ) {}
}
