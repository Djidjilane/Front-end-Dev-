import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { Table, Tag, Space, Button, Card, Typography, message } from 'antd';
import { EyeOutlined, FilePdfOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function MesCandidaturesTache() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/entreprise/mesCandidaturesTache', {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
         let data = [];
        if (response.data.candidatures && Array.isArray(response.data.candidatures)) {
          data = response.data.candidatures;
        } else {
          console.warn('Format de données inattendu:', response.data);
        }
        setCandidatures(data);
      } catch (error) {
        message.error('Erreur lors du chargement des candidatures');
        console.error('Erreur:', error);
        setCandidatures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  const columns = [
    {
      title: 'Tâche',
      dataIndex: ['sous_traitance', 'tache'],
      key: 'tache',
      render: (text, record) => (
        <Button 
          type="link" 
          onClick={() => navigate(`/taches/${record.sous_traitance.id}`)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Projet',
      dataIndex: ['sous_traitance', 'projet', 'titre'],
      key: 'projet',
    },
    {
      title: 'Date Candidature',
      dataIndex: 'created_at',
      key: 'date',
      render: date => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: statut => {
        let icon, color;
        switch (statut) {
          case 'acceptee':
            icon = <CheckCircleOutlined />;
            color = 'green';
            break;
          case 'refusee':
            icon = <CloseCircleOutlined />;
            color = 'red';
            break;
          default:
            icon = <ClockCircleOutlined />;
            color = 'orange';
        }
        return (
          <Tag icon={icon} color={color}>
            {statut.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => navigate(`/candidatures/${record.id}`)}
          >
            Détails
          </Button>
          <Button 
            icon={<FilePdfOutlined />} 
            onClick={() => window.open(`http://127.0.0.1:8000/${record.motivation}`, '_blank')}
          >
            Motivation
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card bordered={false}>
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="mb-0">
            Mes candidatures
          </Title>
          <Text>
            {candidatures.length} candidature{candidatures.length > 1 ? 's' : ''}
          </Text>
        </div>

        <Table
          columns={columns}
          dataSource={candidatures}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          onChange={setPagination}
          locale={{
            emptyText: (
              <div className="py-12 text-center">
                <FilePdfOutlined className="text-4xl text-gray-400 mb-3" />
                <Text type="secondary">Aucune candidature trouvée</Text>
                <div className="mt-4">
                  <Button type="primary" onClick={() => navigate('/taches')}>
                    Voir les tâches disponibles
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </Card>
    </div>
  );
}