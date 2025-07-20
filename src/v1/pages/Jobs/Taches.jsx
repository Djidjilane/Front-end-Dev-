import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Divider, 
  Tag, 
  Space, 
  Button,
  Row,
  Col,
  Descriptions,
  Badge,
  Spin,
  Empty,
  message
} from 'antd';
import { 
  CalendarOutlined, 
  ProjectOutlined, 
  BankOutlined,
  TeamOutlined,
  FileTextOutlined,
  PlusSquareTwoTone,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import axiosInstance from '../../../api/axiosInstance';

const { Title, Text, Paragraph } = Typography;

const Taches = () => {
  const navigate = useNavigate();
  const { tacheId } = useParams();
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);

  // Fonction pour charger les tâches
  const fetchTaches = async () => {
    setLoading(true);
    setError(null);
    try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.get('/entreprise/taches', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

      setTaches(response.data.taches);
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  // Formatage des dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Calcul du statut
  const getStatus = (tache) => {
    if (new Date(tache.date_fin) < new Date()) {
      return { text: 'Terminé', color: 'default' };
    }
    if (tache.entreprise_sous_traitante_id) {
      return { text: 'Attribuée', color: 'green' };
    }
    return { text: 'En attente', color: 'orange' };
  };

  // Gestion des actions
 const handlePostuler = (tache) => {
  
  const token = localStorage.getItem('token');
  if (!token) {
    message.warning('Veuillez vous connecter pour postuler');
    navigate('/login');
    return;
  }

  // Redirection vers la page de candidature
  navigate(`/candidater/tache/${tache.id}`);
};

  const handleViewDetails = (tache) => {
    message.info(`Affichage des détails pour la tâche ${tache.id}`);
    navigate(`/taches/${tache.id}`);
    
  };

  // Composant d'affichage d'une tâche individuelle
  const TacheItem = ({ tache }) => {
    const [isHovered, setIsHovered] = useState(false)
    const status = getStatus(tache);

    return (
      <Card 
        style={{ marginBottom: 24, borderRadius: 8, backgroundColor: isHovered ? '#f3f4f6' : 'transparent', transition: 'background-color 1.2s', }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        headStyle={{ borderTop: '3px solid #9a3412' }}
        title={
          <Space className='text-2xl text-orange-900 ml-60'>
            <FileTextOutlined />
            <Text className='text-2xl text-orange-800' strong>{tache.tache}</Text>
          </Space>
        }
        extra={
          <Badge 
            status={status.color} 
            text={status.text} 
            style={{ fontWeight: 500 }}
          />
        }
        actions={[
          <Button 
            className='border-1 hover: hover:border-blue-500'
            type="link" 
            icon={<PlusSquareTwoTone />} 
            onClick={() => handlePostuler(tache)}
            disabled={!!tache.entreprise_sous_traitante_id}
          >
            Postuler
          </Button>
          
        ]}
      >
        <Row gutter={[16, 16]}>
          {/* Colonne gauche - Détails de la tâche */}
          <Col xs={24} md={12}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Période" >
                <CalendarOutlined /> {formatDate(tache.date_debut)} - {formatDate(tache.date_fin)}
              </Descriptions.Item>
              <Descriptions.Item label="Mode d'attribution">
                {tache.mode === "appel" ? "Appel d'offres" : "Directe"}
              </Descriptions.Item>
              <Descriptions.Item label="Statut">
                <Tag color={status.color}>{status.text}</Tag>
              </Descriptions.Item>
            </Descriptions>

            
          </Col>

          {/* Colonne droite - Projet et Entreprise */}
          <Col xs={24} md={12}>
            {/* Section Projet */}
            <Card 
              size="small" 
              title={
                <Space>
                  <ProjectOutlined />
                  <Text>Projet concerné</Text>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              {tache.projet ? (
                <>
                  <Title level={5} style={{ marginTop: 0 }}>{tache.projet.titre}</Title>
                  <Paragraph ellipsis={{ rows: 2 }}>{tache.projet.description}</Paragraph>
                  
                  <Space direction="vertical" size="small">
                    <Text>
                      <EnvironmentOutlined /> {tache.projet.lieu || 'Lieu non spécifié'}
                    </Text>
                    <Text>
                      <CalendarOutlined /> {formatDate(tache.projet.date_debut)} - {formatDate(tache.projet.date_fin)}
                    </Text>
                  </Space>
                </>
              ) : (
                <Text type="secondary">Information projet non disponible</Text>
              )}
            </Card>

            {/* Section Entreprise */}
            <Card 
              size="small" 
              title={
                <Space>
                  <BankOutlined />
                  <Text>Entreprise maître d'ouvrage</Text>
                </Space>
              }
            >
              {tache.entreprise_maitre ? (
                <>
                  <Title level={5} style={{ marginTop: 0 }}>{tache.entreprise_maitre.nom_entreprise}</Title>
                  
                  <Space direction="vertical" size="small">
                    
                    <Text>
                      <PhoneOutlined /> {tache.entreprise_maitre.user.telephone || 'Non spécifié'}
                    </Text>
                    <Text>
                      <MailOutlined /> {tache.entreprise_maitre.user.email || 'Non spécifié'}
                    </Text>
                   
                  </Space>
                </>
              ) : (
                <Text type="secondary">Information entreprise non disponible</Text>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    );
  };

  // Affichage principal
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={3}>Tâches de Sous-traitance</Title>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={fetchTaches}
          loading={loading}
        >
          Actualiser
        </Button>
      </div>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : taches.length === 0 ? (
        <Empty
          description="Aucune tâche de sous-traitance disponible"
          imageStyle={{ height: 60 }}
        />
      ) : (
        taches.map(tache => (
          <TacheItem key={tache.id} tache={tache} />
        ))
      )}
    </div>
  );
};

export default Taches;