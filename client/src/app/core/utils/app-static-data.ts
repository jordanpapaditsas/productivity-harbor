import { Guid } from 'guid-typescript';

export class AppStaticData {
  // Guids
  public static readonly PhAdminRoleId = Guid.parse(
    '3b28c94b-c894-4f91-b5e6-3bb0671dd09a'
  );
  public static readonly AdminRoleId = Guid.parse(
    '4993238c-ea61-4c59-a015-b54f4efc7701'
  );
  public static readonly UserRoleId = Guid.parse(
    '08a67996-9d5a-44b6-9416-dfdbe2b6b812'
  );
  public static readonly GuestRoleId = Guid.parse(
    'c26a8d32-8511-426d-8f51-2f0990bd569c'
  );
  public static readonly PhAdminId = Guid.parse(
    '4576ae9e-90d9-4271-b023-d50d6442c5d4'
  );
  public static readonly AdminId = Guid.parse(
    'eed6a6a2-09a2-4d3f-8163-87be46c9ac57'
  );

  // Strings
  public static readonly owner: string = 'Iordanis Papaditsas';
  public static readonly appName: string = 'Productivity Harbor';
  public static readonly PhAdminRoleName = 'PhAdmin';
  public static readonly AdminRoleName = 'Admin';
  public static readonly UserRoleName = 'User';
  public static readonly GuestRoleName = 'Guest';
  public static readonly PhAdminUserName = 'PhAdmin';
  public static readonly AdminUserName = 'Admin';
}
