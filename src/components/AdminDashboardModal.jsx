import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { enrollmentsApi, buildStudentWhatsAppUrl } from '../services/api';
import {
  CheckCircle2,
  XCircle,
  KeyRound,
  Ban,
  ExternalLink,
  Copy,
  History,
  Users
} from 'lucide-react';

export default function AdminDashboardModal() {
  const {
    isAdminModalOpen,
    closeAdminModal,
    currentUser,
    refreshEnrollments,
    showToast
  } = useApp();

  const [enrollments, setEnrollments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'paid_unactivated' | 'active' | 'rejected'
  const [activeView, setActiveView] = useState('requests'); // 'requests' | 'audit'
  const [loadingAction, setLoadingAction] = useState(false);

  const loadAdminData = async () => {
    try {
      const res = await enrollmentsApi.getAllForAdmin();
      const list = res.data || [];
      setEnrollments(list);
      setAuditLogs(res.auditLogs || []);
      if (selectedItem) {
        const updated = list.find((i) => i.id === selectedItem.id);
        if (updated) {
          setSelectedItem(updated);
          setAdminNotesInput(updated.adminNotes || '');
        }
      } else if (list.length > 0) {
        setSelectedItem(list[0]);
        setAdminNotesInput(list[0].adminNotes || '');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAdminModalOpen) {
      loadAdminData();
    }
  }, [isAdminModalOpen]);

  if (!isAdminModalOpen) return null;

  const handleSelectRow = (item) => {
    setSelectedItem(item);
    setAdminNotesInput(item.adminNotes || '');
  };

  const handleAdminAction = async (actionType) => {
    if (!selectedItem) return;
    if (actionType === 'REJECT_REQUEST' && !adminNotesInput.trim()) {
      showToast('يرجى كتابة سبب الرفض في حقل ملاحظات الإدارة قبل رفض الطلب');
      return;
    }

    setLoadingAction(true);
    try {
      const res = await enrollmentsApi.updateStatus(selectedItem.id, {
        action: actionType,
        adminName: currentUser?.name || 'Hala Admin',
        adminNotes: adminNotesInput.trim()
      });

      await loadAdminData();
      await refreshEnrollments();

      const actionMessages = {
        CONFIRM_PAYMENT: `تم تأكيد استلام الدفع للطالبة ${res.enrollment.fullName}`,
        REJECT_REQUEST: `تم رفض طلب الطالبة ${res.enrollment.fullName}`,
        ACTIVATE_ACCESS: `تم تفعيل الوصول للكورس للطالبة ${res.enrollment.fullName}`,
        REVOKE_ACCESS: `تم إلغاء صلاحية الوصول (Revoke) للطالبة ${res.enrollment.fullName}`
      };
      showToast(actionMessages[actionType] || 'تم تحديث الطلب بنجاح');
    } catch (err) {
      showToast(err.message || 'تعذر تنفيذ الإجراء');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCopyGmail = (gmail) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(gmail);
      showToast(`تم نسخ بريد Gmail: ${gmail} لإضافته في YouTube Studio`);
    }
  };

  const filteredEnrollments = enrollments.filter((item) => {
    if (filterStatus === 'pending') return item.paymentStatus === 'pending' && item.requestStatus === 'pending';
    if (filterStatus === 'paid_unactivated') return item.paymentStatus === 'paid' && item.accessStatus !== 'active';
    if (filterStatus === 'active') return item.accessStatus === 'active';
    if (filterStatus === 'rejected') return item.requestStatus === 'rejected' || item.accessStatus === 'revoked';
    return true;
  });

  return (
    <div className="modal-overlay" onClick={closeAdminModal} role="dialog" aria-modal="true">
      <div className="luxury-modal-sheet large admin-dashboard-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="luxury-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span dir="ltr" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '20px', letterSpacing: '0.12em', color: '#7A1C2E' }}>
              HALLA ADMIN
            </span>
            <span className="admin-badge-pill caption-3">
              لوحة إدارة طلبات الاشتراك وتفعيل YouTube Private
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'requests' ? 'audit' : 'requests')}
              className="btn-luxury-text button-xsm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {activeView === 'requests' ? (
                <>
                  <History size={14} />
                  <span>السجل الإداري ({auditLogs.length})</span>
                </>
              ) : (
                <>
                  <Users size={14} />
                  <span>جدول طلبات الاشتراك ({enrollments.length})</span>
                </>
              )}
            </button>

            <button onClick={closeAdminModal} className="luxury-modal-close" aria-label="إغلاق">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="luxury-modal-body-scroll">
          {activeView === 'audit' ? (
            <div style={{ padding: '24px 28px' }}>
              <h4 className="title-1" style={{ marginBottom: '6px' }}>
                السجل الإداري (Audit Log)
              </h4>
              <p className="body-5" style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                توثيق كامل لمن قام بتأكيد الدفع أو التفعيل أو الإلغاء وتوقيت كل إجراء.
              </p>

              {auditLogs.length === 0 ? (
                <p className="body-5" style={{ color: 'var(--color-text-subtle)' }}>لا توجد إجراءات مسجلة بعد.</p>
              ) : (
                <div className="admin-audit-list">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="admin-audit-row">
                      <div>
                        <strong className="caption-1" style={{ color: 'var(--color-primary)' }}>
                          {log.action}
                        </strong>
                        <p className="caption-2" style={{ color: 'var(--color-noir)' }}>{log.details}</p>
                      </div>
                      <div style={{ textAlign: 'left', fontSize: '12px', color: 'var(--color-text-subtle)' }}>
                        <div>بواسطة: {log.actor}</div>
                        <div dir="ltr">{new Date(log.timestamp).toLocaleString('ar-EG')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="admin-split-layout">
              {/* Table Column */}
              <div className="admin-table-col">
                {/* Filter Pills */}
                <div className="admin-filter-strip">
                  {[
                    { id: 'all', label: `الكل (${enrollments.length})` },
                    { id: 'pending', label: 'بانتظار الدفع' },
                    { id: 'paid_unactivated', label: 'مدفوع وبانتظار تفعيل YouTube' },
                    { id: 'active', label: 'مفعّل' },
                    { id: 'rejected', label: 'مرفوض / ملغى' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilterStatus(f.id)}
                      className={`admin-filter-pill ${filterStatus === f.id ? 'active' : ''}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Requests Table */}
                <div className="admin-table-wrapper">
                  <table className="admin-requests-table">
                    <thead>
                      <tr>
                        <th>الطالبة</th>
                        <th>الكورس</th>
                        <th>Gmail المشاهدة</th>
                        <th>الدفع</th>
                        <th>الوصول</th>
                        <th>التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.map((item) => {
                        const isSelected = selectedItem?.id === item.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => handleSelectRow(item)}
                            className={isSelected ? 'selected-row' : ''}
                          >
                            <td>
                              <div style={{ fontWeight: 600, color: 'var(--color-noir)' }}>{item.fullName}</div>
                              <div dir="ltr" style={{ fontSize: '11.5px', color: 'var(--color-text-subtle)' }}>{item.phone}</div>
                            </td>
                            <td style={{ fontSize: '12.5px' }}>{item.courseName}</td>
                            <td>
                              <code dir="ltr" style={{ fontSize: '12px', color: 'var(--color-primary)' }}>
                                {item.email}
                              </code>
                            </td>
                            <td>
                              <span className={`status-pill status-${item.paymentStatus}`}>
                                {item.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`status-pill status-${item.accessStatus}`}>
                                {item.accessStatus}
                              </span>
                            </td>
                            <td style={{ fontSize: '11.5px', color: 'var(--color-text-subtle)' }}>
                              {new Date(item.requestedAt).toLocaleDateString('ar-EG')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail & Actions Side Panel */}
              <div className="admin-detail-col">
                {selectedItem ? (
                  <div>
                    <div className="caption-3" style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>
                      تفاصيل طلب الاشتراك وإجراءات التفعيل
                    </div>
                    <h4 className="title-1" style={{ marginBottom: '12px' }}>
                      {selectedItem.fullName}
                    </h4>

                    <div className="admin-detail-info-box">
                      <div className="admin-info-row">
                        <span>الكورس:</span>
                        <strong>{selectedItem.courseName}</strong>
                      </div>
                      <div className="admin-info-row">
                        <span>رقم الهاتف:</span>
                        <strong dir="ltr">{selectedItem.phone}</strong>
                      </div>
                      <div className="admin-info-row">
                        <span>بريد YouTube Gmail:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <code dir="ltr" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                            {selectedItem.email}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyGmail(selectedItem.email)}
                            className="copy-gmail-btn"
                            title="نسخ البريد لإضافته في YouTube Studio"
                          >
                            <Copy size={13} />
                            <span>نسخ</span>
                          </button>
                        </div>
                      </div>
                      <div className="admin-info-row">
                        <span>حالة الطلب:</span>
                        <span className={`status-pill status-${selectedItem.requestStatus}`}>{selectedItem.requestStatus}</span>
                      </div>
                      <div className="admin-info-row">
                        <span>حالة الدفع:</span>
                        <span className={`status-pill status-${selectedItem.paymentStatus}`}>{selectedItem.paymentStatus}</span>
                      </div>
                      <div className="admin-info-row">
                        <span>حالة الوصول:</span>
                        <span className={`status-pill status-${selectedItem.accessStatus}`}>{selectedItem.accessStatus}</span>
                      </div>
                      {selectedItem.paidAt && (
                        <div className="admin-info-row">
                          <span>تاريخ تأكيد الدفع:</span>
                          <span dir="ltr">{new Date(selectedItem.paidAt).toLocaleString('ar-EG')}</span>
                        </div>
                      )}
                      {selectedItem.activatedAt && (
                        <div className="admin-info-row">
                          <span>تاريخ التفعيل:</span>
                          <span dir="ltr">{new Date(selectedItem.activatedAt).toLocaleString('ar-EG')}</span>
                        </div>
                      )}
                    </div>

                    {/* Step-by-step YouTube Studio reminder */}
                    <div className="youtube-studio-checklist-box caption-2">
                      <strong>خطوات التفعيل اليدوي على YouTube:</strong>
                      <ol style={{ paddingRight: '18px', marginTop: '4px', lineHeight: 1.6 }}>
                        <li>تأكدي أولاً من استلام المبلغ واضغطي «تأكيد الدفع».</li>
                        <li>انسخي بريد Gmail أعلاه وأضيفيه في YouTube Studio ضمن المشاهدين المسموح لهم (Private).</li>
                        <li>اضغطي «تفعيل الوصول للكورس» ليظهر الكورس في حساب الطالبة.</li>
                      </ol>
                    </div>

                    {/* Admin Notes / Rejection Reason */}
                    <div style={{ marginTop: '12px' }}>
                      <label className="caption-1" style={{ display: 'block', marginBottom: '4px' }}>
                        ملاحظات الإدارة / سبب الرفض (اختياري):
                      </label>
                      <textarea
                        rows={2}
                        value={adminNotesInput}
                        onChange={(e) => setAdminNotesInput(e.target.value)}
                        placeholder="سجّلي مرجع التحويل أو سبب رفض الطلب..."
                        className="luxury-text-input"
                        style={{ height: 'auto', padding: '8px 12px', fontSize: '13px' }}
                      />
                    </div>

                    {/* 5 Official Admin Actions */}
                    <div className="admin-actions-stack">
                      <a
                        href={buildStudentWhatsAppUrl(selectedItem.phone, selectedItem.fullName, selectedItem.courseName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-action-btn whatsapp"
                      >
                        <ExternalLink size={15} />
                        <span>1. فتح محادثة WhatsApp مع الطالبة</span>
                      </a>

                      <button
                        type="button"
                        disabled={loadingAction || selectedItem.paymentStatus === 'paid'}
                        onClick={() => handleAdminAction('CONFIRM_PAYMENT')}
                        className="admin-action-btn confirm-pay"
                      >
                        <CheckCircle2 size={15} />
                        <span>2. تأكيد استلام الدفع (paymentStatus = paid)</span>
                      </button>

                      <button
                        type="button"
                        disabled={loadingAction || selectedItem.paymentStatus !== 'paid' || selectedItem.accessStatus === 'active'}
                        onClick={() => handleAdminAction('ACTIVATE_ACCESS')}
                        className="admin-action-btn activate"
                      >
                        <KeyRound size={15} />
                        <span>3. تفعيل الوصول بعد إضافة البريد في YouTube</span>
                      </button>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <button
                          type="button"
                          disabled={loadingAction || selectedItem.requestStatus === 'rejected'}
                          onClick={() => handleAdminAction('REJECT_REQUEST')}
                          className="admin-action-btn reject"
                        >
                          <XCircle size={15} />
                          <span>رفض الطلب</span>
                        </button>

                        <button
                          type="button"
                          disabled={loadingAction || selectedItem.accessStatus !== 'active'}
                          onClick={() => handleAdminAction('REVOKE_ACCESS')}
                          className="admin-action-btn revoke"
                        >
                          <Ban size={15} />
                          <span>إلغاء الوصول (Revoke)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="body-5" style={{ color: 'var(--color-text-subtle)' }}>
                    اختاري طلباً من الجدول لعرض تفاصيله وتنفيذ الإجراءات.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

