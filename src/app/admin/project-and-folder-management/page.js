import ProjectAndFolderManagement from './_Component/ProjectAndFolderManagement';

export const metadata = {
  title: 'Project and Folder Management',
  description: 'Admin project and folder management page',
};

export default function page() {
  return (
    <div>
      <ProjectAndFolderManagement />
    </div>
  );
}
