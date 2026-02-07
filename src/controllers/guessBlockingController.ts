import { Request, Response, NextFunction } from 'express';
import { GuessBlockingService } from '../services/guessBlockingService';

export class GuessBlockingController {
  static async status(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await GuessBlockingService.getStatus();
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  static async history(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 50;
      const data = await GuessBlockingService.getHistory(limit);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  static async dashboard(req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Guess Blocking | Painel</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

    :root {
      --bg: #05060a;
      --panel: #0d111a;
      --card: #111827;
      --muted: #8ea0c2;
      --accent: #6ee7b7;
      --accent-2: #7c3aed;
      --warn: #f59e0b;
      --danger: #f87171;
      --success: #34d399;
      --border: rgba(255, 255, 255, 0.08);
      --grid-gap: 18px;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      background: radial-gradient(circle at 10% 20%, #0c1326 0, rgba(5, 6, 10, 0.85) 45%),
        radial-gradient(circle at 90% 10%, #10243e 0, rgba(5, 6, 10, 0.8) 40%),
        linear-gradient(135deg, #05060a 0%, #0a0b12 100%);
      color: #e5e7eb;
    }

    .shell {
      max-width: 1180px;
      margin: 0 auto;
      padding: 32px 22px 48px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 24px;
    }

    .title {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--muted);
      font-size: 15px;
      margin-top: 4px;
    }

    .pill {
      padding: 8px 14px;
      border-radius: 12px;
      background: linear-gradient(120deg, rgba(52, 211, 153, 0.22), rgba(74, 222, 128, 0.18));
      border: 1px solid var(--border);
      color: #bbf7d0;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--grid-gap);
      margin-bottom: 22px;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 18px 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }

    .card h3 {
      margin: 0 0 10px;
      font-size: 16px;
      letter-spacing: -0.01em;
    }

    .stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .stat .label { color: var(--muted); font-size: 13px; }
    .stat .value { font-size: 18px; font-weight: 600; }

    .row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--grid-gap);
      align-items: stretch;
    }

    .badge {
      padding: 6px 10px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--border);
    }

    .badge.success { background: rgba(52, 211, 153, 0.18); color: #bbf7d0; }
    .badge.warn { background: rgba(245, 158, 11, 0.16); color: #fcd34d; }
    .badge.danger { background: rgba(248, 113, 113, 0.14); color: #fecdd3; }
    .badge.info { background: rgba(110, 231, 183, 0.18); color: #a7f3d0; }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px 10px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      font-size: 13px;
      color: #d1d5db;
    }

    th { color: #9ca3af; font-weight: 600; letter-spacing: 0.02em; }
    tr:hover td { background: rgba(255, 255, 255, 0.03); }

    .table-wrap {
      overflow: auto;
      border-radius: 14px;
      border: 1px solid var(--border);
    }

    .muted { color: var(--muted); }
    .mono { font-family: 'Space Grotesk', 'SFMono-Regular', Consolas, monospace; }

    .chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .chip {
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-size: 13px;
    }

    .meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }

    .footer-note { margin-top: 16px; color: var(--muted); font-size: 12px; }

    .info-btn {
      margin-left: 6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid rgba(74, 222, 128, 0.5);
      background: rgba(34, 197, 94, 0.15);
      color: #bbf7d0;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }

    .info-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(34, 197, 94, 0.25); }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 9999;
    }

    .modal {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      max-width: 520px;
      width: 100%;
      padding: 18px 18px 16px;
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.4);
      color: #e5e7eb;
    }

    .modal h4 { margin: 0 0 8px; font-size: 17px; }
    .modal p { margin: 0 0 10px; color: #cbd5e1; font-size: 13px; line-height: 1.55; }
    .modal ul { margin: 8px 0 0 18px; color: #a7f3d0; font-size: 13px; }
    .modal li { margin: 4px 0; }

    .modal-close {
      margin-top: 12px;
      background: linear-gradient(135deg, #22c55e, #4ade80);
      color: #0b0c12;
      border: none;
      padding: 10px 14px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(34, 197, 94, 0.25);
    }

    button.refresh {
      background: linear-gradient(135deg, #22c55e, #4ade80);
      color: #0b0c12;
      border: none;
      padding: 10px 14px;
      margin-bottom: 10px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 12px 30px rgba(34, 197, 94, 0.25);
      transition: transform 140ms ease, box-shadow 140ms ease;
    }

    button.refresh:hover { transform: translateY(-1px); box-shadow: 0 14px 34px rgba(74, 222, 128, 0.28); }

    .error-box {
      margin-top: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(248, 113, 113, 0.12);
      border: 1px solid rgba(248, 113, 113, 0.3);
      color: #fecdd3;
      font-size: 13px;
    }

    @media (max-width: 720px) {
      header { flex-direction: column; align-items: flex-start; }
      .row { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <div class="title">Painel do Guess Blocking</div>
        <div class="subtitle">Status em tempo real, configuração ativa e histórico de execuções.</div>
      </div>
      <span class="pill" id="service-pill">Carregando...</span>
    </header>

    <div class="grid">
      <div class="card">
        <h3>Status do serviço</h3>
        <div class="stat"><span class="label">Próxima execução</span><span class="value" id="next-run">--</span></div>
        <div class="stat"><span class="label">Última execução</span><span class="value" id="last-run">--</span></div>
        <div class="stat"><span class="label">Último resultado</span><span class="value" id="last-outcome">--</span></div>
      </div>
      <div class="card">
        <h3>Configuração ativa</h3>
        <div class="stat"><span class="label">Cron <button class="info-btn" id="cron-info-btn" aria-label="Como ler o cron">i</button></span><span class="value mono" id="cron-expression">--</span></div>
        <div class="stat"><span class="label">Timezone</span><span class="value" id="timezone">--</span></div>
        <div class="stat"><span class="label">Tarefa agendada</span><span class="value" id="scheduled">--</span></div>
      </div>
      <div class="card">
        <h3>Resumo da última execução</h3>
        <div class="meta">
          <div class="stat"><span class="label">Semana</span><span class="value" id="last-week">--</span></div>
          <div class="stat"><span class="label">Games atualizados</span><span class="value" id="games-updated">--</span></div>
          <div class="stat"><span class="label">Palpites finalizados</span><span class="value" id="guesses-finished">--</span></div>
        </div>
        <div class="chips" id="last-message"></div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <h3>Histórico recente</h3>
          <button class="refresh" id="refresh-btn" type="button">Atualizar</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Quando</th>
                <th>Semana</th>
                <th>Resultado</th>
                <th>Games</th>
                <th>Palpites</th>
                <th>Mensagem</th>
              </tr>
            </thead>
            <tbody id="history-body">
              <tr><td colspan="6" class="muted">Carregando histórico...</td></tr>
            </tbody>
          </table>
        </div>
        <div class="footer-note">Atualiza a cada 30s automaticamente.</div>
      </div>
    </div>

    <div id="error-box" class="error-box" style="display:none;"></div>
  </div>

  <div class="modal-overlay" id="cron-modal">
    <div class="modal">
      <h4>Como ler o cron</h4>
      <p>O cron tem 5 campos: minuto, hora, dia-do-mês, mês, dia-da-semana. Exemplo <strong>0 12 * * 6</strong> = ao meio-dia de todo sábado.</p>
      <ul>
        <li>0 12 = minuto 0, hora 12 (meio-dia)</li>
        <li>* * = qualquer dia do mês e qualquer mês</li>
        <li>6 = sábado (0 ou 7 = domingo)</li>
      </ul>
      <button class="modal-close" id="cron-modal-close" type="button">Entendi</button>
    </div>
  </div>

  <script>
    const formatDate = (value) => {
      if (!value) return '--';
      const date = new Date(value);
      return date.toLocaleString('pt-BR', { hour12: false });
    };

    const capitalize = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : '--';

    const badge = (outcome) => {
      const base = 'badge ' + (outcome === 'success' ? 'success' : outcome === 'skipped' ? 'warn' : 'danger');
      return \`<span class="\${base}">\${capitalize(outcome)}</span>\`;
    };

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text ?? '--';
    };

    const setHtml = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    const setError = (message) => {
      const box = document.getElementById('error-box');
      if (!message) {
        box.style.display = 'none';
        box.textContent = '';
        return;
      }
      box.style.display = 'block';
      box.textContent = message;
    };

    async function loadStatus() {
      const response = await fetch('/guess-blocking/status');
      if (!response.ok) throw new Error('Falha ao carregar status');
      const payload = await response.json();
      return payload.data;
    }

    async function loadHistory() {
      const response = await fetch('/guess-blocking/history?limit=50');
      if (!response.ok) throw new Error('Falha ao carregar histórico');
      const payload = await response.json();
      return payload.data;
    }

    function renderStatus(data) {
      const last = data.lastEvent || {};
      setText('cron-expression', data.cronExpression);
      setText('timezone', data.timezone);
      setText('scheduled', data.scheduled ? 'Agendado' : 'Não iniciado');
      setText('next-run', data.nextRunAt ? formatDate(data.nextRunAt) : (data.nextRunError || '--'));
      setText('last-run', last.triggeredAt ? formatDate(last.triggeredAt) : 'Sem execuções');
      setHtml('last-outcome', last.outcome ? badge(last.outcome) : '<span class="muted">--</span>');
      setText('last-week', last.weekNumber ?? '--');
      setText('games-updated', last.gamesUpdated ?? '--');
      setText('guesses-finished', last.guessesFinished ?? '--');
      setHtml('last-message', last.message ? \`<span class="chip">\${last.message}</span>\` : '<span class="chip">Sem mensagem</span>');
      const pill = document.getElementById('service-pill');
      if (pill) {
        pill.textContent = data.scheduled ? 'Tarefa ativa' : 'Tarefa não encontrada';
        pill.style.background = data.scheduled ? 'linear-gradient(120deg, rgba(52, 211, 153, 0.25), rgba(110, 231, 183, 0.2))' : 'linear-gradient(120deg, rgba(245, 158, 11, 0.25), rgba(248, 113, 113, 0.18))';
      }
    }

    function renderHistory(rows) {
      const body = document.getElementById('history-body');
      if (!body) return;
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="muted">Nenhum registro encontrado.</td></tr>';
        return;
      }

      body.innerHTML = rows.map(item => \`
        <tr>
          <td>\${formatDate(item.triggeredAt)}</td>
          <td>\${item.weekNumber ?? '--'}</td>
          <td>\${badge(item.outcome)}</td>
          <td>\${item.gamesUpdated}</td>
          <td>\${item.guessesFinished}</td>
          <td>\${item.message ?? ''}</td>
        </tr>
      \`).join('');
    }

    async function refresh() {
      try {
        setError('');
        const [status, history] = await Promise.all([loadStatus(), loadHistory()]);
        renderStatus(status);
        renderHistory(history);
      } catch (error) {
        setError(error.message || 'Erro inesperado ao atualizar o painel');
      }
    }

    document.getElementById('refresh-btn').addEventListener('click', refresh);

    const cronModal = document.getElementById('cron-modal');
    const cronBtn = document.getElementById('cron-info-btn');
    const cronClose = document.getElementById('cron-modal-close');

    const openModal = () => { cronModal.style.display = 'flex'; };
    const closeModal = () => { cronModal.style.display = 'none'; };

    cronBtn.addEventListener('click', openModal);
    cronClose.addEventListener('click', closeModal);
    cronModal.addEventListener('click', (ev) => { if (ev.target === cronModal) closeModal(); });

    refresh();
    setInterval(refresh, 30000);
  </script>
</body>
</html>`);
  }
}
