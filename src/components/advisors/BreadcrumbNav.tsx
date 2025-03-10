
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbNavProps {
  items: { name: string; url: string }[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  return (
    <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
      <ol className="flex text-sm text-slate-500">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <li className="mx-2">/</li>}
            <li className={index === items.length - 1 ? "text-teal-600" : ""}>
              {index === items.length - 1 ? (
                item.name
              ) : (
                <Link to={item.url.replace("https://advisorwiz.com", "")} className="hover:text-teal-600">
                  {item.name}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
