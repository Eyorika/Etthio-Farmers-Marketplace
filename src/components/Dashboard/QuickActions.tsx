const QuickActions = ({ farmerId }: { farmerId: string }) => {
    const actions = [
      { name: 'Add Product', link: '/add-product' },
      { name: 'View Orders', link: '/orders' },
      { name: 'Manage Inventory', link: '/inventory' },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <a
            key={action.name}
            href={action.link}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">{action.name}</h3>
          </a>
        ))}
      </div>
    );
  };
  
  export default QuickActions; // Add this line