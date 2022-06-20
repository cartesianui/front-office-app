/** Route Item Type for NavItem. */
type RouteItemType = {
  /** Name to show on Navigation. */
  name: string;
  /** URL of the route. */
  url: string;
  /** Name of the Icon element class. e.g 'fa fa-home', 'icon-home'. */
  icon: string;
  /** Children of the route, shows as accordion. */
  children?: Omit<RouteItemType, 'children'>[];
};

/** NavItem title type. */
type TitleType = {
  /** Title to show for the following section. */
  title: string;
};

/** NavItem divider type. */
type DividerType = {
  /** Shows a divider. */
  divider: boolean;
};

/** Type for a Navigation Item. */
type NavItemType = RouteItemType | TitleType | DividerType;

export { NavItemType, DividerType, RouteItemType };
